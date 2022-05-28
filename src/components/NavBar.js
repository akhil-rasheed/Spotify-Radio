import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Radio";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/LibraryMusic";

export default function NavBar({ value, setValue }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-selected": {
        color: "#fff",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#fff",
      },
    })
  );

  return (
    <div className="grid place-items-center bg-gradient-to-r from-black to-slate-900 w-screen">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        className="bg-gradient-to-tr from-pink-900 to-purple-500 p-4 rounded-lg"
      >
        <StyledTab icon={<PhoneIcon />} label="RADIO" />
        <StyledTab icon={<FavoriteIcon />} label="FAVORITES" />
        <StyledTab icon={<PersonPinIcon />} label="YOUR STATIONS" />
      </Tabs>
    </div>
  );
}
