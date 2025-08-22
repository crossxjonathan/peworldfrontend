import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import workersReducer from "./worker.reducer";
import portfolioReducer from "./portfolio.reducer";
import experienceReducer from "./experience.reducer";
import skillReducer from "./skill.reducer";
import recruitersReducer from "./recruiter.reducer";
import userReducer from "./user.reducer";
import hireReducer from "./hire.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    workerProfile: workersReducer,
    recruiterProfile: recruitersReducer,
    portfolio: portfolioReducer,
    experience: experienceReducer,
    skill: skillReducer,
    role: userReducer,
    hireWorker: hireReducer
});

export default rootReducer