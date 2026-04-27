import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useDesignStore } from '../../features/designer/DesignStore';
import { useListDesigns, useSaveDesign, useDeleteDesign } from '../../features/designs/queries';
import { deserializeDesign } from '../../features/designs/serialization';
import { getAuthGatingMessage } from '../../features/designs/authGating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Save, FolderOpen, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function MyDesignsPanel() {
  const { identity } = useInternetIdentity();
  const { design, loadDesign } = useDesignStore();
  const { data: designs = [], isLoading } = useListDesigns();
  const saveDesignMutation = useSaveDesign();
  const deleteDesignMutation = useDeleteDesign();
  
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [designName, setDesignName] = useState('');

  const isAuthenticated = !!identity;

  const handleSave = async () => {
    if (!designName.trim()) {
      toast.error('Please enter a design name');
      return;
    }

    try {
      await saveDesignMutation.mutateAsync({
        name: designName.trim(),
        config: design,
      });
      toast.success(`Design "${designName}" saved successfully`);
      setSaveDialogOpen(false);
      setDesignName('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save design');
    }
  };

  const handleLoad = async (designData: string) => {
    try {
      const config = deserializeDesign(designData);
      loadDesign(config);
      toast.success('Design loaded successfully');
    } catch (error) {
      toast.error('Failed to load design');
    }
  };

  const handleDelete = async (name: string) => {
    try {
      await deleteDesignMutation.mutateAsync(name);
      toast.success(`Design "${name}" deleted`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete design');
    }
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000); // Convert nanoseconds to milliseconds
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Designs</h2>
          <p className="text-sm text-muted-foreground mt-1">Save and manage your builds</p>
        </div>
      </div>

      <Separator />

      {/* Save Button */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full gap-2" disabled={!isAuthenticated}>
            <Save className="h-4 w-4" />
            Save Current Design
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Design</DialogTitle>
            <DialogDescription>
              Give your drone design a name to save it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="design-name">Design Name</Label>
              <Input
                id="design-name"
                placeholder="My Awesome Drone"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && designName.trim()) {
                    handleSave();
                  }
                }}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSave}
              disabled={!designName.trim() || saveDesignMutation.isPending}
            >
              {saveDesignMutation.isPending ? 'Saving...' : 'Save Design'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!isAuthenticated && (
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="pt-6 text-center text-sm text-muted-foreground">
            {getAuthGatingMessage('list')}
          </CardContent>
        </Card>
      )}

      {/* Designs List */}
      {isAuthenticated && (
        <div className="space-y-3">
          {isLoading ? (
            <Card className="bg-card/50">
              <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                Loading designs...
              </CardContent>
            </Card>
          ) : designs.length === 0 ? (
            <Card className="bg-card/50 border-dashed">
              <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                No saved designs yet. Save your first design above!
              </CardContent>
            </Card>
          ) : (
            designs.map((design) => (
              <Card key={design.name} className="bg-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">{design.name}</CardTitle>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTimestamp(design.timestamp)}
                  </div>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => handleLoad(design.designData)}
                  >
                    <FolderOpen className="h-4 w-4" />
                    Load
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                        disabled={deleteDesignMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Design</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{design.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(design.name)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
