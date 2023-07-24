import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Container,
  InputAdornment,
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Network.css";

const Network = () => {
  const [SMEs, setSMEs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setSMEs(Array(10).fill(data[0])));
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="filters"
        style={{ display: "flex", alignItems: "center", marginBottom: "1%" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "5%" }}
        >
          <TextField
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            sx={{ minWidth: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <FormControl sx={{ minWidth: 180, marginLeft: 10 }}>
          <InputLabel>Category</InputLabel>
          <Select
            id="category"
            value={category}
            label="Category"
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value={"Astrophysics"}>Astrophysics</MenuItem>
            <MenuItem value={"UX/UI Development"}>UX/UI Development</MenuItem>
            <MenuItem value={"Everything Else"}>Everything Else</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180, marginLeft: 10 }}>
          <InputLabel>Branch</InputLabel>
          <Select
            id="branch"
            value={branch}
            label="Branch"
            onChange={(event) => setBranch(event.target.value)}
          >
            <MenuItem value={"Army"}>Army</MenuItem>
            <MenuItem value={"Navy"}>Navy</MenuItem>
            <MenuItem value={"Marine Corps"}>Marine Corps</MenuItem>
            <MenuItem value={"Air Force"}>Air Force</MenuItem>
            <MenuItem value={"Space Force"}>Space Force</MenuItem>
            <MenuItem value={"Coast Guard"}>Coast Guard</MenuItem>
            <MenuItem value={"National Guard"}>National Guard</MenuItem>
          </Select>
        </FormControl>
      </div>

      <section className="results">
        {SMEs.map((e, i) => {
          return (
            <Card key={`${i}`} sx={{ maxWidth: "15vw" }}>
              <CardActionArea component={Link} to={`/sme/${e.userid}`}>
                <CardMedia
                  component="img"
                  src="/default.png"
                  alt="User Profile Picture"
                />
                <CardContent>
                  <Typography variant="h5">
                    {`${e.firstname} ${e.lastname}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    SME Category (to fetch)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    SME Location (to fetch)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {e.email}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </section>
    </>
  );
};

export default Network;
