import data from "@/app/datab.json";

const highlightCode = (code: string) => {
  const keywords = ["function", "return", "let", "const", "if", "for", "new"];
  const types = ["number", "string", "boolean"];
  const lines = code.split("\n");

  return lines.map((line, index) => {
    const parts = line
      // Entferne unnötiges HTML-Escaping
      .split(/(\s+|[\(\){}\[\];.,!:=<>+\-*\/]+)/) // trennt auch Operatoren & Sonderzeichen
      .filter(Boolean)
      .map((part, i) => {
        if (keywords.includes(part)) {
          return <span key={i} className="text-purple-600">{part}</span>;
        }
        if (types.includes(part)) {
          return <span key={i} className="text-green-700">{part}</span>;
        }
        if (/^[0-9]+$/.test(part)) {
          return <span key={i} className="text-rose-600">{part}</span>;
        }
        if (/^".*"$/.test(part) || /^'.*'$/.test(part)) {
          return <span key={i} className="text-rose-600">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      });

    return (
      <div key={index} className="whitespace-pre">
        {parts}
      </div>
    );
  });
};


export default function Home() {
  return (
    <div className="h-dvh max-w-screen bg-white grid justify-center content-center p-4">
      <div className="max-w-2xl">
        <h1 className="text-xl font-bold mb-2">Name: {data.name}</h1>
        <h1 className="text-xl font-bold mb-2">Leetcode number: {data.number}</h1>

        <h2 className="text-lg font-semibold">Description:</h2>
        <p className="mb-4">{data.description}</p>

        <h2 className="text-lg font-semibold mb-2">Examples:</h2>
        <ul className="list-disc pl-5 mb-4">
          {Object.entries(data.example).map(([key, value]) => (
            <li key={key} className="mb-1">{value}</li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mb-2">Solution:</h2>
        <pre className="bg-[#f5f5f5] text-sm text-black p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
          <code>{highlightCode(data.solution)}</code>
        </pre>
      </div>
    </div>
  );
}

