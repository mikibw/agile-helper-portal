import React, { useEffect, useState } from "react";
import Group from "./Group";
import { LoadingCircle } from "../../lib.js";
import { client } from "../../client.js";
const Dashboard = () => {
  const [isSubmiting, setSubmiting] = useState(false);
  const [project, setProject] = useState();
  const [group, setGroup] = useState();
  const [projectName, setProjectName] = useState();
  const [invitationCode, setInvitationCode] = useState();

  const handleUserDeleteFromGroup = (id) => {
    client("/v1/users/projects", {
      data: { userId: id },
      method: "DELETE",
    }).then((resp) => {
      if (resp.data.success) {
        setProject();
        setGroup();
      }
    });
  };

  const onProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectCreate = (e) => {
    e.preventDefault();
    setSubmiting(true);
    client("/v1/projects", {
      data: { name: projectName },
    }).then((resp) => {
      setProject(resp.data);
    });
  };

  const handleInvite = (e) => {
    client("/v1/invitations", {
      method: "POST",
    }).then((resp) => {
      setInvitationCode(resp.data.code);
    });
  };

  useEffect(() => {
    client("/v1/users", {}).then((resp) => {
      setProject(resp.data.project);
    });
  }, []);

  useEffect(() => {
    if (!project) {
      return;
    }
    client("/v1/projects/users").then((resp) => {
      if (resp.data) {
        setGroup(resp.data);
      } else {
        setProject();
        setGroup();
      }
    });
  }, [project]);
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {project ? project.name : "No Project"}
          </h1>
          {project && (
            <div className="flex items-center  mt-3">
              <button
                type="submit"
                className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleInvite}
              >
                {isSubmiting && LoadingCircle}
                Invite
              </button>
              {invitationCode && (
                <label className="ml-3 bg-gray-100 px-2 py-1">
                  Send this link to other:{" "}
                  {"http://" +
                    window.location.host +
                    `/invitations/${invitationCode}`}
                </label>
              )}
            </div>
          )}
        </div>
      </header>
      <main>
        {group ? (
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Group group={group} onDelete={handleUserDeleteFromGroup} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={handleProjectCreate}
            >
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label className="sr-only">Email address</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Project Name"
                    onChange={onProjectNameChange}
                  />
                  <button
                    type="submit"
                    className="mt-3 w-full flex justify-center  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isSubmiting && LoadingCircle}
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
