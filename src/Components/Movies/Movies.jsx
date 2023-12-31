import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import avatar from "../../av.png";
export default function Movies() {

const [trendingmovie, settrendingmovie] = useState([]);
const [test, setTest] = useState([]);
  async function getMovirs() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=6405b6ccfd5dc803fa746c73bc6b9b1c`
    );
    settrendingmovie(data.results);
    // console.log(data.results);
  }

  useEffect(() => {
    getMovirs();
  }, []);
  async function getuser() {
    let data = await axios.get(
      `https://192.168.10.3:8080/api-gateway/api/users/register`
    );
    setTest(data);
    console.log(data);
  }

  useEffect(() => {
    getuser();
  }, []);



  return (
    <>
      <div className="row">
        {trendingmovie.map((movie, index) => (
          <div key={index} className="col-md-3 mt-5">
            <div className="movie">
              <Link to={`/movieDetals/${movie.id}/${movie.media_type}`}>
                <div className="movie position-relative">
                  {movie.poster_path ? (
                    <img
                      className="w-100 rounded-3"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                  ) : (
                    ""
                  )}
                  {movie.profile_path ? (
                    <img
                      className="w-100  rounded-3"
                      src={`https://image.tmdb.org/t/p/w500${movie.profile_path}`}
                    />
                  ) : (
                    ""
                  )}
                  {!movie.poster_path && !movie.profile_path ? (
                    <img className=" rounded-3 w-100" src={avatar} alt="" />
                  ) : (
                    ""
                  )}
                  <h6 className="h6 my-2 text-muted fa-bolder">
                    {movie.title}
                    {movie.name}
                  </h6>
                  {movie.vote_average ? (
                    <div className="vote p-2 text-center  rounded-3  position-absolute top-0 end-0">
                      {movie.vote_average?.toFixed(1)}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
