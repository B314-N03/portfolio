import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, TimeScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { Bar } from 'react-chartjs-2';

ChartJS.register(TimeScale, LinearScale, BarElement, Tooltip, Legend);

const Contributions = ({ username }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');

        const repos = await reposResponse.json();
        const oneYearAgo = subDays(new Date(), 365).toISOString();

        const commitsPromises = repos.map(repo =>
          fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?since=${oneYearAgo}`)
            .then(res => res.json())
            .then(commits => commits.map(commit => ({
              date: new Date(commit.commit.committer.date).toISOString().split('T')[0],
              repo: repo.name,
            })))
        );

        const commits = await Promise.all(commitsPromises);
        const allCommits = commits.flat();

        const groupedByDate = allCommits.reduce((acc, commit) => {
          acc[commit.date] = (acc[commit.date] || 0) + 1;
          return acc;
        }, {});

        const dateRange = eachDayOfInterval({
          start: subDays(new Date(), 365),
          end: new Date(),
        }).map(date => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          return {
            date: formattedDate,
            count: groupedByDate[formattedDate] || 0,
          };
        });

        setContributions(dateRange);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, [username]);

  if (loading) return <p>Loading contributions...</p>;
  if (error) return <p>Error fetching contributions: {error}</p>;

  const data = {
    labels: contributions.map(entry => entry.date),
    datasets: [
      {
        label: 'Commits',
        data: contributions.map(entry => entry.count),
        backgroundColor: contributions.map(entry => {
          if (entry.count === 0) return '#ebedf0';
          if (entry.count < 5) return '#9be9a8';
          if (entry.count < 10) return '#40c463';
          if (entry.count < 20) return '#30a14e';
          return '#216e39';
        }),
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        borderRadius: 2,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'week',
          round: 'week',
          tooltipFormat: 'MMM d, yyyy',
          displayFormats: {
            week: 'MMM d',
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => `${tooltipItem.raw} contributions`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '150px', width: '100%' }}>
      <h1>{username}'s Contributions</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Contributions;
