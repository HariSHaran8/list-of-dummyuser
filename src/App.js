import React,{useEffect,useState} from "react";
import {Modal,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [users,setUsers]=useState([]);
  const [currentUser,setcurrentUser]=useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id)=>{
    setShow(true);
    setcurrentUser(id)
  } 
  async function fetchUsers(){
    let res = await fetch('https://listofdummy.free.beeceptor.com/');
    let response=await res.json()
    setUsers(response)
  }
  useEffect(() => {
    fetchUsers();
    console.log(users.length)
  }, [])
  return (
    <div className="App container">
      <div className="row">
        {users&& users.map((data,i)=>
          <div className="col-md-4 border">
            <div className="card-body">
              <h5 className="card-title">Name: {data.name}</h5>
              <p>Age: {data.age}</p>
              <p>Date of Birth: {data.dob}</p>
              <p>Gender: {data.gender}</p>
              <button className="btn btn-success" onClick={()=>handleShow(data.id)}>More</button>
            </div>   

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>{users[currentUser].name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Age:{users[currentUser].age}</p>
                  <p>Date of Birth:{users[currentUser].dob}</p>
                  <p>Gender: {users[currentUser].gender}</p>
                  <p>Town :{users[currentUser].more.Town}</p>
                  <p>District :{users[currentUser].more.District}</p>
                  <p>Phone No: {users[currentUser].more.Phno}</p>

                </Modal.Body>
                <Modal.Footer>
                  {(currentUser!==0) && <Button variant="secondary" onClick={()=>{
                    setcurrentUser(currentUser-1)
                  }}>
                    Previous
                  </Button>
                  }
                  {(currentUser<users.length-1) && <Button variant="primary" onClick={()=>{
                    setcurrentUser(currentUser+1)
                  }}>
                    Next
                  </Button>
                  }
                </Modal.Footer>
            </Modal>
          </div>
        )}
       
        
      </div>
    </div>
  );
}

export default App;
