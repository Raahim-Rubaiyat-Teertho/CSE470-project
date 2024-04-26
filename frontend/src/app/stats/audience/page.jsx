'use client'

import { useState, useEffect } from "react";
import { getSessionId } from "@/app/login/handleSessions";
import Navbar from "@/components/ui/navbar";
import { Bar } from 'react-chartjs-2';
import { Button } from "@/components/ui/button";

import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export default function ArtistStats() {
    const [uname, setUname] = useState('');
    const [posts, setPosts] = useState([]);
    const [posts2, setPosts2] = useState();

    useEffect(() => {
        const fetchSessionId = async () => {
            try {
                const id = await getSessionId();
                setUname(id);
            } catch (error) {
                console.error("Error fetching session ID:", error);
            }
        };

        fetchSessionId();
    }, []);

    async function fetchStats() {
        try {
            const response = await fetch(`http://localhost:8000/stats/audience/getUpvoteNumbers/${uname}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    }

    async function fetchEarnings() {
      const res1 = await fetch(`http://localhost:8000/stats/audience/${uname}`);
      const res1_json = await res1.json();
      setPosts2(res1_json);
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <Button className='mt-10' onClick={fetchStats}>Graph</Button>
            </div>

            <div className="flex justify-center">
              <Button className='mt-10' onClick={fetchEarnings}>Upvotes and Details</Button>
            </div>

            <div>
              {
                posts2 && (
                  <div className="mt-10 text-center mb-10">
                    <p>Total Upvotes: {posts2.totalUpvotes}</p>
                    <p>Most Engaging Audience: {posts2.mostEngagedUser}</p>
                  </div>
                )
              }
            </div>

            <div className="mt-5 mb-10">
                {posts.length > 0 && (
                    <Bar
                        data={{
                            labels: posts.map(post => post.post_title),
                            datasets: [{
                                label: 'Upvotes',
                                data: posts.map(post => post.upvotes),
                                backgroundColor: 'rgba(75,192,192,0.2)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false
                        }}
                        width={400}
                        height={300}
                        className="px-20"
                    />
                )}
            </div>
        </div>
    );
}
