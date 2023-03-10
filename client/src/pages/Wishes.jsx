import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context";
import Screen from "../components/Screen";
import WishItem from "../components/WishItem";
import WishFinder from "../apis/WishFinder";

function Wishes(props) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [wishes, setWishes] = useState([]);
  useEffect(() => {
    const fetchAllWishes = async () => {
      try {
        const res = await WishFinder.post("/wishes", {
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
      await WishFinder.delete("/wishes/" + id);
      setWishes(
        wishes.filter((wish) => {
          return wish.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit(id) {
    navigate(`/update/${id}`);
  }

  function handleAdd() {
    navigate("/add");
  }

  return (
    <Screen>
      <div className="wishPageWrapper">
        <h1 className="wishPageTitle">Your Wishes</h1>
        <ul className="wishContainer">
          {wishes.map((wish) => (
            <WishItem
              id={wish.id}
              title={wish.title}
              body={wish.body}
              onEdit={() => handleEdit(wish.id)}
              onDelete={() => handleDelete(wish.id)}
            />
          ))}
        </ul>
        <button className="wishAddButton" onClick={handleAdd}>
          Add new wish
        </button>
      </div>
    </Screen>
  );
}

export default Wishes;
