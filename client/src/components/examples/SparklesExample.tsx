import Sparkles from '../Sparkles';

export default function SparklesExample() {
  return (
    <div className="relative w-full h-64 bg-gradient-to-b from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-md overflow-hidden">
      <Sparkles />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground">Sparkles floating in the background</p>
      </div>
    </div>
  );
}
