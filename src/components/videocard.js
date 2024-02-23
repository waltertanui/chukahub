import React from 'react';

const VideoCard = ({ uploads }) => {
  return (
    <div className="p-4 md:p-24 w-full md:w-1/2 mt-4 rounded-md flex flex-col md:flex-row gap-8">
      {uploads.length > 0 ? (
        uploads.map((upload) => (
          <div key={upload.id} className="mb-4 border border-gray-300 p-4 md:p-10 rounded-md bg-slate-200 flex flex-col">
            <h3 className="text-xl mb-2">{upload.title}</h3>
            <p className="mb-2">{upload.description}</p>
            <div className="flex gap-2">
              <p className="mb-2 flex">Faculty: {upload.faculty}</p>
              <p className="mb-2 flex">Department: {upload.department}</p>
              <p className="mb-2 flex">Year: {upload.year}</p>
            </div>
            <a href={upload.downloadURL} className="text-blue-500 hover:underline">Watch</a>
          </div>
        ))
      ) : (
        <p className="mt-4 text-green-400">No videos found.</p>
      )}
    </div>
  );
};

export default VideoCard;
