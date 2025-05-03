import Card from "../../components/home/card";
import Graphic from "../../components/home/grafica";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Sección del gráfico */}
      <div className="w-full max-w-4xl flex justify-center">
        <Graphic />
      </div>

      {/* Sección de las cards en wrap */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
        <Card title="Productos" description="TOTAL: " />
        <Card title="Cajeros" description="TOTAL: " />
        <Card title="Categorías" description="TOTAL: " />
        

       
      </div>
    </div>
  );
}
