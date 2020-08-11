const Course = require(`../models/Course`);
const Instructor = require(`../models/Instructor`);
const ErrorResponse = require(`../utils/errorResponse`);
const asynchandler = require(`../middleware/async`);

// @desc GetInstructor
//@route GET /api/v1/instructor
//@route GET /api/v1/instructor/:bootcampId/courses
// @access Public
exports.getCourses = asynchandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc Get single course
//@route GET /api/v1/courses/:id
// @access Public
// exports.getCourse = asynchandler(async (req, res, next) => {
//   const course = await Course.findById(req.params.id).populate({
//     path: 'bootcamp',
//     select: 'name description'
//   });

//   if (!course) {
//     return next(
//       new ErrorResponse(`No course witht the id of ${req.params.id}`),
//       404
//     );
//   }
//   res.status(200).json({
//     success: true,
//     count: course.length,
//     data: course
//   });
// });

// @desc Add Instructor
//@route POST /api/v1/instructor
// @access Private
exports.addInstructor = asynchandler(async (req, res, next) => {
  req.body.user = req.user.id;

  // Make sure user is bootcamp owner
  // if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`,
  //       401
  //     )
  //   );
  // }

  const instructor = await Instructor.create(req.body);
  res.status(200).json({
    success: true,
    data: instructor
  });
});

// @desc Update Instructor
//@route PUT /api/v1/instructor/:id
// @access Private
exports.updateInstructor = asynchandler(async (req, res, next) => {
  let instructor = await Instructor.findById(req.params.id);

  if (!instructor) {
    return next(
      new ErrorResponse(
        `No instructor witht the id of ${req.params.bootcampId}`
      ),
      404
    );
  }
  // Make sure user is course owner
  if (
    instructor.user.toString() !== req.user.id &&
    req.user.role !== 'instructor'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update instructor ${course._id}`,
        401
      )
    );
  }

  instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc Delete course
//@route Delete /api/v1/courses/:id
// @access Private
// exports.deleteCourse = asynchandler(async (req, res, next) => {
//   const course = await Course.findById(req.params.id);

//   if (!course) {
//     return next(
//       new ErrorResponse(`No course witht the id of ${req.params.bootcampId}`),
//       404
//     );
//   }
//   // Make sure user is course owner
//   if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to delete course ${course._id}`,
//         401
//       )
//     );
//   }

//   await course.remove();
//   res.status(200).json({
//     success: true,
//     data: {}
//   });
// });
