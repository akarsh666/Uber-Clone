"use client"
import { useState } from 'react';
import GoogleMapSection from '../components/Home/GoogleMapSection';
import SearchSection from '../components/Home/SearchSection';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/DestinationContext';
import { LoadScript } from '@react-google-maps/api';

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <div>
          <SignedIn>
            
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <LoadScript
          libraries={['places']}
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
            <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
              <div>
                <SearchSection />
              </div>
              <div className='col-span-2'>
                <GoogleMapSection />
              </div>
            </div>
          </LoadScript>
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}