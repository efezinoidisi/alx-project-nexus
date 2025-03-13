import { Job } from "@/interfaces";
import { createContext } from "react";

interface JobContextInterface {
  jobs: Job[];
}

const JobContext = createContext<JobContextInterface | null>(null);

JobContext.displayName = "JobContext";
