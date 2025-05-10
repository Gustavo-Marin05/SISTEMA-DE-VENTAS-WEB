import CardCompany from "../../components/orders/cardCompany";

export default function Orders() {
  return (
    <>
      <div  className="flex flex-col items-center gap-6">

        {/* seccion de las card de la empresas que se muestran en un circulo */}
        <h1>EMPRESAS PRODUCTORAS REGISTRADAS</h1>
        <div className="flex flex-wrap justify-center gap-4 w-200 max-w-6xl bg-[#2E3A4B] rounded ">

          <CardCompany
          title={"company"}
          image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s"}
          />
          <CardCompany
          title={"company"}
          image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s"}
          />
          <CardCompany
          title={"company"}
          image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s"}
          />
          <CardCompany
          title={"company"}
          image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s"}
          />
          <CardCompany
          title={"company"}
          image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s"}
          />
          <CardCompany
          title={"company"}
          image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s"}
          />
        </div>
        <div>

        </div>
      </div>
    </>
  );
}
