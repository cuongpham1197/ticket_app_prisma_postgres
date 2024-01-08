import TicketForm from "@/components/TicketForm";
import React from "react";
import axios from "axios";

const TicketPage = ({ data }) => {
  console.log("1 ticket data: ", data);
  return <TicketForm ticket={data} />;
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  if (id === "new") {
    return { props: { data: { id: "new" } } };
  }
  // const res = await fetch(`http://localhost:3000/api/tickets/${id}`);
  // const data = await res.json();

  const data = await axios
    .get(`http://localhost:3000/api/tickets/${id}`)
    .then((res) => res.data);
  console.log("get 1 ticket data: ", data);
  return {
    props: { data: data.foundTicket },
  };
}

export default TicketPage;
