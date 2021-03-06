(function(angular) {
  'use strict';

  angular
    .module('frontendTestApp')
    .factory('database', [
      '$log',
      'localStorageService',
      function($log, localStorageService) {
        /**
         * generate yesterday, today, and tomorrow
         * @param  {String} dateType
         * @return {String}          [date in yyyy-mm-dd format]
         */
        function getDate(dateType) {
          var d = new Date();

          switch (dateType) {
            case 'today':
              break;
            case 'yesterday':
              d.setDate(d.getDate() - 1);
              break;
            default:
              d.setDate(d.getDate() + 1);
              break;
          }

          return d.toISOString().slice(0, 10);
        }

        /**
         * initialize mock data
         * @return {[type]} [description]
         */
        function initializeData() {
          var tasksByDates = [{
            'date_id': getDate('today'),
            'users': [{
              'id': 'user1',
              'fullname': 'Alex Smith',
              'avatar': 'assets/images/alex.png',
              'comment': 'Add new copy to 8am post',
              'task_completed': 'complete'
            }, {
              'id': 'user2',
              'fullname': 'Ann Beckman',
              'avatar': 'assets/images/ann.png',
              'comment': 'Change image crop',
              'task_completed': 'complete'
            }],
            'posts': [{
              'id': 'task1_post1',
              'starting_time': '8:00am',
              'starting_time_short': '8am',
              'post_items': [{
                'id': 'task1_post1_postitem1',
                'title': 'Note UK',
                'source': 'twitter',
                'image': 'assets/images/alex-post.jpg',
                'status': 'Approved',
              }]
            }, {
              'id': 'task1_post2',
              'starting_time': '12:00pm',
              'starting_time_short': '12pm',
              'post_items': [{
                'id': 'task1_post2_postitem1',
                'title': 'Note UK',
                'source': 'instagram',
                'image': 'assets/images/alex-post2.jpg',
                'status': 'Draft',
              }, {
                'id': 'task1_post2_postitem2',
                'title': 'Note UK',
                'source': 'instagram',
                'image': 'assets/images/alex-post3.jpg',
                'status': 'Draft',
              }]
            }],
            'info': {
              'live': 'Published on Wednesday 4/6 at 8:00AM',
              'copy': "Nothing says launch party like macaroons! If you're in LA stop by and check out new headphones.",
              'hashtag': '#echolaunch',
              'link': 'bitly.com/echolaunch156948321',
              'topic': 'Speakers',
              'filename': '1569481321.jpg',
              'created_by': 'Alex Smith - via Photographer',
              'total_usage': '2 (last used November 13, 2015)',
              'status': 'Approved on 4/3'
            }
          }, {
            'date_id': getDate('yesterday'),
            'users': [{
              'id': 'user1',
              'fullname': 'Alex Smith',
              'avatar': 'assets/images/alex.png',
              'comment': 'Add new copy to 8am post',
              'task_completed': 'complete'
            }],
            'posts': [{
              'id': 'task1_post1',
              'starting_time': '12:00pm',
              'starting_time_short': '12pm',
              'post_items': [{
                'id': 'task1_post1_postitem1',
                'title': 'Note UK',
                'source': 'instagram',
                'image': 'assets/images/alex-post2.jpg',
                'status': 'Draft',
              }, {
                'id': 'task1_post1_postitem2',
                'title': 'Note UK',
                'source': 'instagram',
                'image': 'assets/images/alex-post3.jpg',
                'status': 'Draft',
              }]
            }],
            'info': {
              'live': 'Published on Wednesday 4/6 at 8:00AM',
              'copy': "Nothing says launch party like macaroons! If you're in LA stop by and check out new headphones.",
              'hashtag': '#echolaunch',
              'link': 'bitly.com/echolaunch156948321',
              'topic': 'Speakers',
              'filename': '1569481321.jpg',
              'created_by': 'Alex Smith - via Photographer',
              'total_usage': '2 (last used November 13, 2015)',
              'status': 'Approved on 4/3'
            }
          }, {
            'date_id': getDate('tomorrow'),
            'users': [{
              'id': 'user2',
              'fullname': 'Ann Beckman',
              'avatar': 'assets/images/ann.png',
              'comment': 'Change image crop',
              'task_completed': 'complete'
            }],
            'posts': [{
              'id': 'task1_post1',
              'starting_time': '12:00pm',
              'starting_time_short': '12pm',
              'post_items': [{
                'id': 'task1_post1_postitem1',
                'title': 'Note UK',
                'source': 'instagram',
                'image': 'assets/images/ann-post.jpg',
                'status': 'Draft',
              }]
            }],
            'info': {
              'live': 'Published on Wednesday 3/5 at 8:00AM',
              'copy': "This is a test campaign",
              'hashtag': '#campaign',
              'link': 'bitly.com/echolaunch1545781',
              'topic': 'Speakers',
              'filename': '1545781.jpg',
              'created_by': 'Ann Beckman - via Photographer',
              'total_usage': '1 (last used January 13, 2016)',
              'status': 'Approved on 6/3'
            }
          }];

          localStorageService.set('tasksByDates', tasksByDates);
        }

        // initialize data
        if (!localStorageService.get('tasksByDates')) {
          initializeData();
        }

        /**
         * get task by specific date
         * @param  {String} dateId
         * @return {Object}        [task by date]
         */
        function getTasksByDate(dateId) {
          var tasksByDates = localStorageService.get('tasksByDates'),
            result = {};

          for (var i = 0, j = tasksByDates.length; i < j; i++) {
            if (tasksByDates[i].date_id === dateId) {
              result = tasksByDates[i];
              break;
            }
          }

          return result;
        }

        return {
          getTasksByDate: getTasksByDate
        };
      }
    ])
})(angular);
