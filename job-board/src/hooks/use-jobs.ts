import { Job } from "@/interfaces";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/job/?page_size=30&page=1");

        if (response.status === 200) {
          setJobs(response.data.results);
        } else {
          setIsError("");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, isLoading, isError };
}
