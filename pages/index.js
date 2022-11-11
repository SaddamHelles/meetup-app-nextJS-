import Head from "next/head";
import { MongoClient } from "mongodb";
import React, { Fragment } from "react";
const DUMMY_MEETUPS = [
  {
    id: "m2",
    title: "A Second Meeetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Gutshaus_Teutendorf.jpg/1200px-Gutshaus_Teutendorf.jpg?20221108140022",
    address: "Some address 2, 841569 Some city",
    description: "This is a second meetup data with image!",
  },
  {
    id: "m1",
    title: "A First Meeetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Thomas_Wolfe%27s_Home.jpg",
    address: "Some address 5, 123415 Some city",
    description: "This is a first meetup data with image!",
  },
  {
    id: "m3",
    title: "A Third Meeetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/2021-01-02-14-57-30-1800x1200_Venice.jpg/1200px-2021-01-02-14-57-30-1800x1200_Venice.jpg?20221108095130",
    address: "Some address 9, 54689 Some city",
    description: "This is a third meetup data with image!",
  },
];
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Brows a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://saddam:UsXMhrsZ6ype7MEP@cluster0.b89jm15.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
export default HomePage;
