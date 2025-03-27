import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const GuideContent = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">DB Schema Designer User Guide</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          Learn how to use the DB Schema Designer to visually create database schemas and generate SQL code.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Basic overview of the application and its main features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The DB Schema Designer is a visual tool that helps you design database schemas using a node-based interface, similar to design tools like Figma. You can create tables, add columns, define relationships, and generate SQL code for your database schema.
          </p>
          <div className="space-y-2">
            <h3 className="font-medium">Main Components:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Canvas Area:</strong> The main workspace where you design your schema by adding and connecting tables.</li>
              <li><strong>SQL Preview Panel:</strong> Shows the generated SQL code based on your visual schema design.</li>
              <li><strong>Controls:</strong> Tools for zooming, panning, and manipulating the canvas.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Creating Tables</CardTitle>
          <CardDescription>
            How to add and manage database tables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Adding a Table:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click the <strong>Add Table</strong> button in the toolbar.</li>
              <li>Enter a name for your table in the dialog.</li>
              <li>Click <strong>Add Table</strong> to create it.</li>
            </ol>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Managing Tables:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Move a table:</strong> Click and drag to reposition it on the canvas.</li>
              <li><strong>Delete a table:</strong> Click the trash icon in the table header.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Working with Columns</CardTitle>
          <CardDescription>
            How to add and configure table columns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Adding Columns:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click the <strong>+</strong> button in the table header.</li>
              <li>Fill in the column details in the dialog:
                <ul className="list-disc pl-5 mt-1">
                  <li><strong>Column Name:</strong> A unique name for the column.</li>
                  <li><strong>Data Type:</strong> Select from available SQL data types (e.g., VARCHAR, INTEGER).</li>
                  <li><strong>Length:</strong> For certain data types like VARCHAR, specify the maximum length.</li>
                  <li><strong>Constraints:</strong> Set options like Primary Key, Unique, and Nullable.</li>
                  <li><strong>Default Value:</strong> Optional default value for the column.</li>
                </ul>
              </li>
              <li>Click <strong>Add Column</strong> to add it to the table.</li>
            </ol>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Managing Columns:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Delete a column:</strong> Click the trash icon next to the column.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Creating Relationships</CardTitle>
          <CardDescription>
            How to connect tables and create relationships
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Creating a Relationship:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click and hold on the <strong>right handle</strong> of a source table.</li>
              <li>Drag to the <strong>left handle</strong> of a target table.</li>
              <li>Release to create the relationship (foreign key).</li>
            </ol>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Relationship Types:</h3>
            <p>
              When you create a relationship, the application automatically generates the appropriate foreign key constraints in the SQL. The relationship is represented as an animated line connecting the tables.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generating SQL</CardTitle>
          <CardDescription>
            How to generate and use the SQL code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">SQL Preview:</h3>
            <p>
              The SQL preview panel on the right side automatically updates as you design your schema. It shows the complete SQL code needed to create your database schema, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>CREATE TABLE statements for each table</li>
              <li>Column definitions with their types and constraints</li>
              <li>Foreign key constraints for relationships</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Using the Generated SQL:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Review the SQL code in the preview panel.</li>
              <li>Click the <strong>Copy SQL</strong> button to copy the code to your clipboard.</li>
              <li>Paste it into your database management tool to create the schema.</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips and Best Practices</CardTitle>
          <CardDescription>
            Recommendations for effective schema design
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Design Tips:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Table Names:</strong> Use singular nouns for table names (e.g., "user" not "users").</li>
              <li><strong>Primary Keys:</strong> Every table should have a primary key.</li>
              <li><strong>Relationships:</strong> Consider the cardinality of relationships (one-to-one, one-to-many, many-to-many).</li>
              <li><strong>Data Types:</strong> Choose appropriate data types for your columns to optimize storage and performance.</li>
              <li><strong>Layout:</strong> Arrange tables logically on the canvas to make the schema more readable.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
