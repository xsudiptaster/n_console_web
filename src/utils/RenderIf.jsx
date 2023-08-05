export default function RenderIf({ renderIf, children }) {
   return <div>{renderIf ? children : <></>}</div>;
}
