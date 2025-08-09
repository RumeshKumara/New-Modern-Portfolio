import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const CardProject = ({
  Img = "/api/placeholder/400/300",
  Title = "Project Title",
  Description = "Project description",
  Link: ProjectLink,
  id,
}) => {
  return (
    <div className="w-full p-4 transition-all duration-300 bg-white rounded-lg shadow-lg group hover:shadow-xl dark:bg-gray-800">
      {/* Project Image */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={Img}
          alt={Title}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Project Info */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {Title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {Description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4">
          {/* Live Demo Button */}
          {ProjectLink ? (
            <a
              href={ProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span className="text-sm font-medium">Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-sm text-gray-400">No Demo</span>
          )}

          {/* Details Button */}
          {id ? (
            <Link
              to={`/project/${id}`}
              className="inline-flex items-center px-3 py-2 space-x-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="text-sm text-gray-400">No Details</span>
          )}
        </div>
      </div>
    </div>
  );
};

CardProject.propTypes = {
  Img: PropTypes.string,
  Title: PropTypes.string,
  Description: PropTypes.string,
  Link: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CardProject;
