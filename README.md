# React Workflow Designer

A drag-and-drop workflow designer built with React, Vite, and React Flow.

## Features

- **Drag-and-Drop Canvas**: Drag nodes from the sidebar to the canvas.
- **Custom Nodes**: Start, Task, Approval, Automated Step, and End nodes.
- **Node Configuration**: Click on a node to edit its properties in the side panel.
  - **Start Node**: Supports custom metadata.
  - **Task Node**: Supports custom fields.
- **Simulation**: Visualize the workflow execution with a step-by-step simulation log.
- **Mock API**: Simulates backend interactions for automation steps and workflow execution.

## Architecture

- **`src/components`**: UI components including Sidebar, Canvas, and Configuration Panel.
- **`src/nodes`**: Custom React Flow node components.
- **`src/forms`**: Configuration forms for each node type.
- **`src/context`**: Global state management using React Context.
- **`src/api`**: Mock API service.

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Design Decisions

- **React Flow**: Chosen for its robust graph handling and customization capabilities.
- **Tailwind CSS**: Used for rapid and consistent styling.
- **Context API**: Simple global state management sufficient for this application scope.
- **Modular Forms**: Each node type has its own form component for easy extensibility.

## Future Improvements

- **Persistance**: Save and load workflows from a backend.
- **Advanced Validation**: Real-time validation of connection rules (e.g., types, cycles).
- **Undo/Redo**: Implement history management.
- **Minimap & Controls**: Add React Flow controls for better navigation.
