import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type DroneDesign = {
    name : Text;
    designData : Text;
    timestamp : Int;
  };

  type UserDesigns = {
    designs : Map.Map<Text, DroneDesign>;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userDesignsMap = Map.empty<Principal, UserDesigns>();

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Drone design functions
  public shared ({ caller }) func saveDesign(name : Text, designData : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save designs");
    };

    let newDesign : DroneDesign = {
      name;
      designData;
      timestamp = Time.now();
    };

    let updatedDesigns = switch (userDesignsMap.get(caller)) {
      case (null) {
        let newDesigns = Map.empty<Text, DroneDesign>();
        newDesigns.add(name, newDesign);
        { designs = newDesigns };
      };
      case (?existingDesigns) {
        existingDesigns.designs.add(name, newDesign);
        existingDesigns;
      };
    };

    userDesignsMap.add(caller, updatedDesigns);
  };

  public query ({ caller }) func getDesign(name : Text) : async ?DroneDesign {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can fetch designs");
    };

    switch (userDesignsMap.get(caller)) {
      case (null) { null };
      case (?userDesigns) {
        userDesigns.designs.get(name);
      };
    };
  };

  public query ({ caller }) func listDesigns() : async [DroneDesign] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can list designs");
    };

    switch (userDesignsMap.get(caller)) {
      case (null) { [] };
      case (?userDesigns) {
        userDesigns.designs.values().toArray();
      };
    };
  };

  public shared ({ caller }) func deleteDesign(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can delete designs");
    };

    switch (userDesignsMap.get(caller)) {
      case (null) { Runtime.trap("No designs found for this user") };
      case (?userDesigns) {
        userDesigns.designs.remove(name);
      };
    };
  };
};
