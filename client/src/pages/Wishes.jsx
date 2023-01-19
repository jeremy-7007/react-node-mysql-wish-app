import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context";
import axios from "axios";
import Screen from "../components/Screen";
import WishItem from "../components/WishItem";

function Wishes(props) {
  const user = useContext(UserContext);
  const [wishes, setWishes] = useState([]);
  useEffect(() => {
    const fetchAllWishes = async () => {
      try {
        const res = await axios.post("http://localhost:8800/wishes", {
          userId: user.id,
        });
        setWishes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllWishes();
  }, [user]);

  async function handleDelete(id) {
    try {
      await axios.delete("http://localhost:8800/wishes/" + id);
      setWishes(
        wishes.filter((wish) => {
          return wish.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Screen>
      <div className="wishPageWrapper">
        <h1>These are your wishes</h1>
        <WishItem />
        <div className="wishes">
          {wishes.map((wish) => (
            <div className="wish" key={wish.id}>
              <h2>{wish.title}</h2>
              <p>{wish.body}</p>
              <button className="delete" onClick={() => handleDelete(wish.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${wish.id}`}>Update</Link>
              </button>
            </div>
          ))}
        </div>
        <button>
          <Link to="/add">Add new wish</Link>
        </button>
      </div>
    </Screen>
  );
}

export default Wishes;
