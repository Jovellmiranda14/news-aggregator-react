// import React, { useEffect, useState } from "react";
// import { Container, Spinner, Row } from "react-bootstrap";
// import NewsList from "../components/NewsList";

// export default function HomePage() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getHomeNews = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/news`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setArticles(data.articles.slice(0, 12));
//       } catch (error) {
//         console.error("Error fetching home news:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getHomeNews();
//   }, []);

//   return (
//     <Container className="my-4 d-flex flex-column align-items-center">
//       <Row>
//         {loading ? (
//           <div className="text-center my-4">
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-center">Newspaper Website</h2>
//             <p className="text-center">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//             <NewsList articles={articles} category="General" />
//           </>
//         )}
//       </Row>
//     </Container>
//   );
// }