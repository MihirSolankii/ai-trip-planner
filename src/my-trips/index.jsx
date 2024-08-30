import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/service/FirebaseConfigl';
import { Link } from 'react-router-dom';
function MyTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]); // State to store fetched trips

  useEffect(() => {
    GetUserTrip();
  }, []);

  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);
    const fetchedTrips = [];

    querySnapshot.forEach((doc) => {
      fetchedTrips.push({ id: doc.id, ...doc.data() }); // Push each trip data to fetchedTrips array
    });

    setTrips(fetchedTrips); // Update the state with fetched trips
  };

  return (
    <div className='p-4'>
        
      <h1 className='text-2xl font-bold mb-4'>My Trips</h1>
    
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer'>
        {trips.length > 0 ? (
          trips.map((trip) => (
           
            <div key={trip.id} className='border rounded-lg p-4 shadow-sm'>
                <Link to={"/view-trip/"+trip.id}>
              <img
                src="/trip.jpg"// Assuming you have an imageURL in your trip data
                alt="trip image" // Use location as alt text
                className='h-40 w-full object-cover rounded-md mb-4'
              />
              <h2 className='text-lg font-semibold'>{trip.userSelection.location}</h2>
              <p>{trip.userSelection.noOfDays} days trip with {trip.userSelection.budget} budget </p>
            </Link>
            </div>
          ))
        ) : (
          <p>No trips found.</p>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
