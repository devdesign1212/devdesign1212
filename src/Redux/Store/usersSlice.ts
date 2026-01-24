import { FetchUserData, UsersState } from '@/Common/interface';
// import { fetchUsersApi } from '@/Services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: UsersState = {
list: [],
page: 0,
loading: false,
selectedUser: null,
};


export const fetchUsers = createAsyncThunk<FetchUserData[], number>(
'users/fetchUsers',
async (page) => {
const limit = 20;
const res = await fetch(
`https://dummyjson.com/users?limit=${limit}&skip=${page * limit}`
);
const data = await res.json();
return data.users;
}
);



const usersSlice = createSlice({
name: 'users',
initialState,
reducers: {
selectUser(state, action: PayloadAction<FetchUserData>) {
state.selectedUser = action.payload;
},
clearUser(state) {
state.selectedUser = null;
},
},
extraReducers: (builder) => {
builder
.addCase(fetchUsers.pending, (state) => {
state.loading = true;
})
.addCase(fetchUsers.fulfilled, (state, action) => {
state.loading = false;
state.page += 1;
state.list.push(...action.payload);
})
.addCase(fetchUsers.rejected, (state) => {
state.loading = false;
});
},
});


export const { selectUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;