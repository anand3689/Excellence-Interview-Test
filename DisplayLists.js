import React, { useEffect, useState } from "react";
import "./DisplayList.css";
import axios from "axios";
import { TablePagination } from "@material-ui/core";
function DisplayLists() {

  const [isloading, setIsloading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(3);  


  const handlePageChange = (newPage) => {setPage(newPage)};

  const handleChangeRowsPerPage = event => {setRowsPerPage(parseInt(event.target.value, 10))};

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users?page-1`)
      .then(res => {
       
        setPosts(res.data.data);
        setIsloading(false);
        setError("");
      })
      .catch(err => {
        setIsloading(false);
        setPosts([]);
        setError(err);
      });
  }, []);

  const sortedData = (post, page, rowsPerPage) => {
    return posts.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const Post = sortedData(posts, page, rowsPerPage);

  return (
    <>
      { isloading ? <div>Loading...</div> : <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Photo</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            { Post.map( post => {
              return (
                <tr key={ post.id }>
                  <td>{ post.id }</td>
                  <td>{ post.first_name }</td>
                  <td>{ post.last_name }</td>
                  <td>{ post.avatar }</td>
                  <td>{ post.email }</td>
                </tr>
              );
            } ) }
          </tbody>
        </table>

        <TablePagination
          rowsPerPageOptions={ [ 3, 6, 9 ] }
          component="div"
          count={ posts.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onPageChange={ handlePageChange }
          onChangeRowsPerPage={ handleChangeRowsPerPage }
        />
      </div> }
    </>
  );
}

export default DisplayLists;
