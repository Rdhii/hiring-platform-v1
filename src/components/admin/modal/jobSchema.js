import * as yup from "yup";

export const jobSchema = yup.object().shape({
    jobName: yup.string().required("Job name is required"),
    jobType: yup.object().nullable().required("Job type is required"),
    jobDescription: yup.string().required("Job description is required"),
    candidateNeeded: yup.number().typeError("Candidate needed must be a number").positive("Must be a positive number").integer("Must be an integer").required("Candidate needed is required"),
    minimumSalary: yup.string().required("Minimum salary is required").test("is-number", "Must be a valid number", (value) => {
        if (!value) return false;
        const num = parseFloat(value.replace(/\./g, ""));
        return !isNaN(num) && num >= 0;
    }),
      maximumSalary: yup
    .string()
    .required("Maximum salary is required")
    .test("is-number", "Must be a valid number", (value) => {
      if (!value) return false;
      const num = parseFloat(value.replace(/\./g, ""));
      return !isNaN(num) && num > 0;
    })
    .test(
      "is-greater",
      "Maximum salary must be greater than minimum",
      function (value) {
        const { minimumSalary } = this.parent;
        if (!value || !minimumSalary) return true;
        const max = parseFloat(value.replace(/\./g, ""));
        const min = parseFloat(minimumSalary.replace(/\./g, ""));
        return max > min;
      }
    ),
})