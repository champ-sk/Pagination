import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const numRows = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );

        if (!response.ok) {
          console.log("Failed to fetch data");
        }
        const result = await response.json();

        setData(result);
      } catch (error) {
        setError(error.message);
        alert("Failed to fetch Data");
      }
    };
    fetchData();
  }, []);

  let totalPages = Math.ceil(data.length / numRows);

  //data for current pages
  let startIndex = (currentPage - 1) * numRows;
  let endIndex = startIndex + numRows;
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((pre) => pre - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((pre) => pre + 1);
    }
  };
  console.log(data);
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Employee Data Table</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <table
            border="1"
            style={{
              margin: "0 auto",
              borderCollapse: "collapse",
              width: "80%",
            }}
          >
            <thead style={{ backgroundColor: "green" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <th>{item.name}</th>
                  <th>{item.email}</th>
                  <th>{item.role}</th>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            style={{
              backgroundColor: "green",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>

          <span
            style={{
              backgroundColor: "green",
              marginRight: "10px",
              padding: "10px 20px",
            }}
          >
            {" "}
            {currentPage}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            style={{
              backgroundColor: "green",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};
export default Page;
