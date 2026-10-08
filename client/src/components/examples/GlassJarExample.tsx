import GlassJar from '../GlassJar';

export default function GlassJarExample() {
  return (
    <div className="flex items-center justify-center p-4">
      <GlassJar width={200} height={280}>
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
          Stars go here
        </div>
      </GlassJar>
    </div>
  );
}
