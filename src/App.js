import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import './App.css';

function App() {
  let formValues = {
    name: '',
    email: '',
    gender: '',
    courses: '',
    phone: '',
    error: {
      name: '',
      email: '',
      gender: '',
      courses: '',
      phone: '',
    },
  };

  const [formData, setFormData] = useState(formValues);

  const [userData, setUserData] = useState([]);

  useEffect(() => {   // athunaala thaa useeffect kulla async await fn kudukuro mount aaga

    async function getData() {

      const response = await axios.get("https://632050349f82827dcf29ba4b.mockapi.io/user"); // fetch ku pathil axios 

      setUserData(response.data);

    }

    getData();

  }, []);      // empty dependency array ethuku na mounting phase naala intha array va empty ya pass panro

  //To handle onChange event

  const handleChange = (e) => {

    let error = { ...formData.error };

    if (e.target.value === '') {

      error[e.target.name] = `${e.target.name} is Required`;

    } else {

      error[e.target.name] = '';

    }

    setFormData({ ...formData, [e.target.name]: e.target.value, error });

  };

  //To handle Edit button

  const onPopulateData = (id) => {  //inga id varu userData la irunthu

    const selectedData = userData.filter((row) => row.id === id)[0];

    setFormData({

      ...formData,
      ...selectedData,

    });

  };

  //To handle Delete button

  const handleDelete = async (id) => {

    const response = await axios.delete(`https://632050349f82827dcf29ba4b.mockapi.io/user/${id}`);

    const user = userData.filter((row) => row.id !== response.data.id);

    console.log(response);

    setUserData(user);

  }

  // To handle submit button

  const handleSubmit = async (e) => {

    e.preventDefault();

    const errKeys = Object.keys(formData).filter((key) => {

      if (formData[key] === "" && key !== "error" && key !== "id") {

        return key;

      }

    });

    if (errKeys.length >= 1) {

      alert("Please Fill All Values");

    } else {

      if (formData.id) {

        const response = await axios.put(`https://632050349f82827dcf29ba4b.mockapi.io/user/${formData.id}`,

          {
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            courses: formData.courses,
            phone: formData.phone,
          }

        );

        let users = [...userData];

        let index = users.findIndex((row) => row.id === response.data.id);

        users[index] = response.data;

        setUserData(users);

      } else {

        const response = await axios.post('https://632050349f82827dcf29ba4b.mockapi.io/user',

          {
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            courses: formData.courses,
            phone: formData.phone,
          }

        );

        setUserData([...userData, response.data]);

      }

      setFormData(formValues);

    }

  };
  return (

    <div style={{ padding: "10px", background: 'yellow', color: 'black', }}>

      <h2 style={{background: 'black', color: 'white', width: '15%'}}>User Detail Form</h2>

      <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={2}>

          <Grid item xs={4}>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '30ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={(e) => handleSubmit(e)}
            >

              <TextField
                id="name"
                label="Name"
                variant="standard"
                value={formData.name}
                name="name"
                onChange={(e) => handleChange(e)} />

              <br />

              <span style={{ color: 'red' }}>{formData.error.name}</span><br />

              <TextField
                id="email"
                label="Email"
                variant="standard"
                value={formData.email}
                name="email"
                onChange={(e) => handleChange(e)} />

              <br />

              <span style={{ color: 'red' }}>{formData.error.email}</span><br />

              <FormControl>

                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => handleChange(e)}
                >

                  <FormControlLabel value="Female" control={<Radio />} label="Female" />

                  <FormControlLabel value="Male" control={<Radio />} label="Male" />

                  <FormControlLabel value="Other" control={<Radio />} label="Other" />

                </RadioGroup>

              </FormControl> <br />

              <FormControl fullWidth>

                <InputLabel id="demo-simple-select-label">Courses</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Courses"
                  value={formData.courses}
                  name="courses"
                  onChange={(e) => handleChange(e)}
                >

                  <MenuItem value="Java">Java</MenuItem>

                  <MenuItem value="Python">Python</MenuItem>

                  <MenuItem value="Node">Node</MenuItem>

                </Select>

              </FormControl> <br />

              <TextField
                id="phone"
                label="Phone"
                type="number"
                variant="standard"
                value={formData.phone}
                name="phone"
                onChange={(e) => handleChange(e)} />

              <br />

              <span style={{ color: 'red' }}>{formData.error.phone}</span><br />

              <Button variant="contained" type="submit">Submit</Button>

            </Box>

          </Grid>

          <Grid item xs={8}>

            <h2 style={{background: 'black', color: 'white', width: '13%'}}>User Data</h2>

            <TableContainer component={Paper}>

              <Table sx={{ width: 880 }} aria-label="simple table">

                <TableHead>

                  <TableRow>

                    <TableCell><b>Id</b></TableCell>

                    <TableCell align="center"><b>Name</b></TableCell>

                    <TableCell align="center"><b>Email</b></TableCell>

                    <TableCell align="center"><b>Gender</b></TableCell>

                    <TableCell align="center"><b>Courses</b></TableCell>

                    <TableCell align="center"><b>Phone</b></TableCell>

                    <TableCell align="center"><b>Action</b></TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>
                  {userData.map((row) => (
                    <TableRow
                      key={row.id}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>

                      <TableCell align="center">{row.name}</TableCell>

                      <TableCell align="center">{row.email}</TableCell>

                      <TableCell align="center">{row.gender}</TableCell>

                      <TableCell align="center">{row.courses}</TableCell>

                      <TableCell align="center">{row.phone}</TableCell>

                      <TableCell align="center">

                        <Button variant="text" onClick={() => onPopulateData(row.id)}>

                          Edit

                        </Button>

                        <br />

                        <Button variant="text" onClick={() => handleDelete(row.id)}>Delete</Button>

                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            </TableContainer>

          </Grid>
        
        </Grid>
      
      </Box>
   
    </div>
  );
}

export default App;
