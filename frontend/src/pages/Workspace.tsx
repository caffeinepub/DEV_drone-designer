import ComponentEditorPanel from '../components/designer/ComponentEditorPanel';
import DronePreviewCanvas from '../components/preview3d/DronePreviewCanvas';
import DesignSummaryPanel from '../components/summary/DesignSummaryPanel';
import MyDesignsPanel from '../components/designs/MyDesignsPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export default function Workspace() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Left Panel - Component Editor */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="h-full overflow-auto border-r border-border/40 bg-card/30">
            <ComponentEditorPanel />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel - 3D Preview */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full bg-background">
            <DronePreviewCanvas />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Summary & My Designs */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="h-full overflow-auto border-l border-border/40 bg-card/30 flex flex-col">
            <div className="flex-1 overflow-auto">
              <DesignSummaryPanel />
            </div>
            <div className="flex-1 overflow-auto border-t border-border/40">
              <MyDesignsPanel />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
