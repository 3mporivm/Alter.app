import endpoints from 'api/endpoints';
import { course } from 'schemas';
import { normalize } from 'normalizr';

export default () => ({
  url: endpoints.getCourseUrl(),
  transform: response => normalize(response.data[0], course.courseSchema).entities,
  transformResult: response => ({
    course: normalize(response.data[0], course.courseSchema).result,
  }),
  queryKey: endpoints.getCourseUrl(),
  meta: {},
  force: true,
  options: {
    headers: {
      Accept: 'application/json',
    },
  },
  update: {
    course: (_, result) => result,
  },
  updateResult: {
    course: (prevResult, result) => result,
  },
});
