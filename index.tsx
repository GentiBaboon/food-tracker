
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    carbs: false,
    alcohol: false,
    sugar: false,
    trainer: false,
    group: false
  });
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const saved = localStorage.getItem('preferences');
    if (saved) {
      setForm(JSON.parse(saved));
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = () => {
    localStorage.setItem('preferences', JSON.stringify(form));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <Head>
        <title>Food & Fitness Tracker</title>
      </Head>
      <h1 className="text-3xl font-bold mb-2">Track Your Food & Fitness Boundaries</h1>
      <p className="text-gray-600 mb-6">Date: {today}</p>

      {!submitted ? (
        <div className="max-w-md w-full bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold">Food Restrictions</h2>
          <label><input type="checkbox" checked={form.carbs} onChange={e => setForm({...form, carbs: e.target.checked})} /> No Carbs</label><br/>
          <label><input type="checkbox" checked={form.alcohol} onChange={e => setForm({...form, alcohol: e.target.checked})} /> No Alcohol</label><br/>
          <label><input type="checkbox" checked={form.sugar} onChange={e => setForm({...form, sugar: e.target.checked})} /> No Sugar</label><br/>

          <h2 className="text-xl font-semibold mt-4">Fitness Activity</h2>
          <label><input type="checkbox" checked={form.trainer} onChange={e => setForm({...form, trainer: e.target.checked})} /> Personal Trainer</label><br/>
          <label><input type="checkbox" checked={form.group} onChange={e => setForm({...form, group: e.target.checked})} /> Fitness Group</label><br/>

          <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded" onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Your Selections:</h2>
          <ul className="list-disc list-inside">
            {form.carbs && <li>No Carbs</li>}
            {form.alcohol && <li>No Alcohol</li>}
            {form.sugar && <li>No Sugar</li>}
            {form.trainer && <li>Personal Trainer</li>}
            {form.group && <li>Fitness Group</li>}
          </ul>
          <p className="mt-4">Stay consistent and track your food & fitness progress each day!</p>
        </div>
      )}
    </div>
  );
}
