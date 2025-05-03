export default function CardCompany({ title, image }) {
    return (
      <div className=" overflow-hidden   m-5 flex flex-col justify-center items-center text-center">
        <img
          src={image}
          alt={title}
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <h2 className="text-sm font-bold">{title}</h2>
      </div>
    );
  }
  