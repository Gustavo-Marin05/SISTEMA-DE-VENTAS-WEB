// src/components/Card.jsx
export default function Card({ title, description }) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-custom m-5 text-center w-50">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}
