
import BlogList from "./bloglist";
import React from "react";
import useFetch from "./useFetch";
const Home = () => {

    const {data:blogs, isPending, error } = useFetch("http://localhost:8000/blogs")
    
   
   
    return ( 
        <div className="home">
            {error && <p>Error: {error}</p>}
            {isPending && <p>Loading...</p>}
            {blogs && <BlogList blogs={blogs} tittle="All Blogs"  />}
            
            
        </div>
     );
}
 
export default Home; 