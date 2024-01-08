import TicketCard from "@/components/TicketCard";
import React from "react";
import axios from "axios";

const Dashboard = ({ tickets }) => {
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>

              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // const res = await fetch("http://localhost:3000//api/tickets");
  // console.log("res: ", res)
  // const tickets = await res.json();

  const tickets = await axios
    .get("http://localhost:3000/api/tickets")
    .then((res) => res.data);
  console.log("get all tickets: ", tickets);
  return { props: { tickets: tickets.tickets } };
}

export default Dashboard;
