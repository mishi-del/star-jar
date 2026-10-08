import OrigamiStar from '../OrigamiStar';

export default function OrigamiStarExample() {
  return (
    <div className="relative w-full h-64 bg-muted/30 rounded-md">
      <OrigamiStar
        id="demo-1"
        color="#FF6B6B"
        x={50}
        y={50}
        size={45}
        rotation={15}
        message="You are amazing!"
        onDragOut={(id) => console.log('Star dragged out:', id)}
        jarBounds={null}
      />
      <OrigamiStar
        id="demo-2"
        color="#4ECDC4"
        x={120}
        y={80}
        size={40}
        rotation={-20}
        message="Believe in yourself"
        onDragOut={(id) => console.log('Star dragged out:', id)}
        jarBounds={null}
      />
      <OrigamiStar
        id="demo-3"
        color="#FFD93D"
        x={200}
        y={40}
        size={50}
        rotation={45}
        message="Dream big!"
        onDragOut={(id) => console.log('Star dragged out:', id)}
        jarBounds={null}
      />
    </div>
  );
}
