import "./styles.css";
import { Input, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";

export default function App() {
  const [fileName, setFilename] = useState("");
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      file: []
    },
    onSubmit: (values) => {
      console.log(values.file);
      console.log(JSON.stringify(values, null, 2));
    }
  });
  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <Input fullWidth name="firstName" onChange={formik.handleChange} />
        <Input fullWidth name="lastName" onChange={formik.handleChange} />
        <label htmlFor="file">
          <input
            style={{ display: "none" }}
            id="file"
            type="file"
            onChange={(e) => {
              let file = e.target.files;
              let myFile = Array.from(file as FileList);
              setFilename(myFile[0].name);
              formik.setFieldValue("file", myFile);
            }}
          />
          {fileName && <span style={{ marginRight: "10px" }}>{fileName}</span>}
          <Button color="secondary" variant="contained" component="span">
            Upload button
          </Button>
        </label>
        <Button type="submit">Отправить</Button>
      </form>
    </div>
  );
}
