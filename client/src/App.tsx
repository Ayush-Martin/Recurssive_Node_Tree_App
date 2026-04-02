import NodeTree from "./components/NodeTree";

const App = () => {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1 className="app-title">Recursive Node Tree</h1>
        <p className="app-description">
          Build and manage hierarchical node structures
        </p>
      </header>

      <main>
        <NodeTree />
      </main>
    </div>
  );
};

export default App;
