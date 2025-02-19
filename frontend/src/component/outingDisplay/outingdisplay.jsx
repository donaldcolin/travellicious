import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const OutingDisplay = ({ outing }) => {
  if (!outing) {
    return <div>No outing data available.</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto p-4">
      <CardContent>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{outing.name}</h2>
        <p className="text-gray-600 mb-4">{outing.description}</p>

        <div className="mb-4">
          <span className="font-semibold">Date:</span> {outing.date}
        </div>

        <div className="mb-4">
          <span className="font-semibold">Location:</span> {outing.location}
        </div>

        <div className="mb-4">
          <span className="font-semibold">Participants:</span>
          <ul className="list-disc pl-5">
            {outing.participants && outing.participants.map((participant, index) => (
              <li key={index} className="text-sm text-gray-500">{participant}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {outing.tags && outing.tags.map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


