import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function WorkRules({ work, setWork }) {
  function handleChangeCheckedStatus(newCheckedStatusValue, index) {
    setWork((work) =>
      work.map((checkedStatus, i) =>
        i === index
          ? { ...checkedStatus, checked: newCheckedStatusValue }
          : checkedStatus,
      ),
    );
  }
  return (
    <FormGroup>
      {work.map((eachRule, i) => {
        return (
          <Box key={eachRule.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={eachRule.checked}
                  onChange={(e) =>
                    handleChangeCheckedStatus(e.target.checked, i)
                  }
                />
              }
              label={eachRule.name}
            />
          </Box>
        );
      })}
    </FormGroup>
  );
}

export default WorkRules;
