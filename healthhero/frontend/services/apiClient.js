import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "token";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request(endpoint, method = `GET`, data = {}) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    console.log("url is: ", url);
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    } else {
      this.token = window.localStorage.getItem("token");
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      console.log(this.token);
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async fetchUserFromToken() {
    return await this.request(`auth/me`, `GET`);
  }

  // async getNutrition() {
  //   return await this.request({ endpoint: `nutrition/`, method: `GET` });
  // }
  async listCommBySchool() {
    const res = await this.request(`community/schoolcommunities`, `GET`);
    return res;
  }
  async listres() {
    //lists all restaurants probs dont need
    const res = await this.request(`restaurant/`, `GET`);
    return res;
  }

  async listRestsbyId() {
    const resId = await this.request(`restaurant/restaurant`, `GET`);
    console.log("res id returned by api call", resId);
    return resId;
  }
  async listMinRestaurants() {
    const res = await this.request(`restaurant/minrestriction`, `GET`);
    return res;
  }

  async listCommbyId(id) {
    const comId = await this.request(`community/communityid/${id}`, `GET`);
    // console.log("comm id returned by api call", comId);
    return comId;
  }

  async listRestbyId(id) {
    const restId = await this.request(`restaurant/restaurantid/${id}`, `GET`);
    console.log("rest id returned by api call", restId);
    return restId;
  }

  async createPost(data, point) {
    return await this.request(point + `/`, `POST`, data);
  }

  async loginUser(credentials) {
    return await this.request(`auth/login`, `POST`, credentials);
  }

  async logoutUser() {
    this.setToken(null);
    localStorage.setItem(this.tokenName, "");
  }

  async signupUser(credentials) {
    const res = await this.request(`auth/register`, `POST`, credentials);
    this.setToken(res.data.token);

    return res;
  }

  async listRestaurantRestrictions(restaurantId) {
    //lists restaurant restrictions for a single restaurant
    console.log("rest id in api client", restaurantId);
    const res = await this.request(
      `restaurant/restrictionsbyrest?restaurantid=${restaurantId}`,
      "GET"
    );
    return res;
  }

  async listRestrictions() {
    //lists all restrictions for restaurant form
    const res = await this.request("restrictions", "GET");
    return res;
  }

  async listUserRestrictions() {
    //lists user restrictions
    const res = await this.request("restrictions/user", "GET");
    return res;
  }

  async listDiets() {
    //lists all diets from restrictions table
    const res = await this.request("restrictions/diets", "GET");
    return res;
  }

  async listAllergies() {
    //lists all allergies from restrictions table
    const res = await this.request("restrictions/allergies", "GET");
    return res;
  }

  async listSchools() {
    //lists all schools
    const res = await this.request("schools", "GET");
    return res;
  }
  // async listSchools() {
  //   const res = await this.request("schools", "GET");
  //   return res;
  // }

  async addSchoolToUser(schoolId) {
    //allows school id to attach to user once they click a school icon
    console.log("school id in apiClient", schoolId);
    const data = { schoolId };
    return await this.request(`schools/userschool`, `PATCH`, data);
  }

  async getSchoolIdByName(schoolName) {
    console.log("school name in api client: ", schoolName);
    const res = await this.request(
      `schools/schoolidfromname?schoolName=${schoolName}`,
      `GET`
    );
    return res;
  }

  // async createRestaurant(restaurantForm){
  //   const res = await this.request("restaurant/create", "POST", restaurantForm)
  //   console.log("whats returned from restaurant/create: " , res.data)
  //   return res;
  // }

  async postUserRestrictions(userRestrictions) {
    //adds user's restrictions to table based on checkbox responses
    console.log("user restrictions in apiClient", userRestrictions);
    const res = await this.request(
      `restrictions/user`,
      `POST`,
      userRestrictions
    );
    return res;
  }

  async listUserRestrictionsObj(){
    const res = await this.request("restrictions/restrictionsobject", "GET")
    return res; 
  }

  async addUserToComm(commId) {
    //adds user and community to user_community table
    const res = await this.request(`community/addusertocomm`, `POST`, {commId});
    return res;
  }

  async listUsersInComm(commId) {
    //list all users that belong to a particular community
    console.log("comm id in api client: " , commId)
    const res = await this.request(
      `community/listusersincomm/${commId}`,
      `GET`
    );
    return res
  }

  async listUserComms() {
    //lists all communities that a SINGLE user belongs to
    const res = await this.request(`community/usercommunities`, `GET`);
    return res;
  }
}

export default new ApiClient("http://localhost:3001");
