import React from 'react';
import { useParams } from 'react-router-dom';
const listOfJobs = [''];
export default function Experience() {
  const { string_slug } = useParams();
  return (
    <section className="experience mt-3">
      <p className="heading fw-bold fs-4 border-bottom">Experience</p>
      <div className="list-group">
        <a
          href="../about-me/software-dev-in-eruvaka"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Eruvaka Technologies Private Limited</h5>
            <small>Jan-2019 to Jan-2022</small>
          </div>
          <p className="mb-1">Software Engineer</p>
          <small className="text-muted">
            element-ui, Highcharts, Google Maps Api, date-fns,
            momentjs,excel.js, fuse.js, webpack, husky, and vue.js
            ecosystem(vuex, vue router, vuei18n, virtual scroller,
            vue-grid-layout).
          </small>
        </a>
        <div
          className={`collapse ${
            string_slug === 'software-dev-in-eruvaka' && 'show'
          }  collapse-sftwr-dev-ervk`}
        >
          <div className="card card-body">
            <p>
              I joined the company as an Associate engineer. In the initial days
              I started working on version 1 of Pondlogs which is a tool used
              for configuring IOT devices manufactured by our company. I have to
              use jquery, php and Mysql for maintaining the application along
              with two other persons.
            </p>
            <p>
              Later I was assigned to learn the vue.js framework which is used
              as frontend for version 2 of Pondlogs application. I am the only
              person in the frontend upto one year for the newer version which
              helped me in developing the ability to work independently. After
              that team size increased to 3 persons. As I was re-writing each
              part of the old version I learned element-ui, Highcharts (library
              for data visualization), Google Maps Api, date-fns,
              momentjs,xlsx.js, fuse.js(elastic search at frontend),
              webpack(bundling), and vue.js ecosystem(vuex, vue router, vuei18n,
              virtual scroller, vue-grid-layout). Also I gained some expertise
              in using git for software verisioning.
            </p>
            <p>
              <strong> I have implemented the following features:</strong>
              <ol className="list-group list-group-numbered ">
                <li className=" list-group-item ">
                  Built Dashboards where processing and computation is
                  implemented at client side using web workers over thousands of
                  records at frontend using highcharts. Also implemented
                  resizing the charts using resize observer which resulted in
                  performance bottleneck in one page. Here I resolved the
                  performance issue by using throttling inside request animation
                  frame function.
                </li>
                <li className="list-group-item ">
                  Maps Page where the customers(shrimp farmers) are allowed to
                  draw ponds on the google maps canvas and data visualization
                  such as changing the draw pond color based on IOT devices data
                  and preferences provided by the user. In this I faced
                  challenges such as managing the states of the maps, handling
                  geometric data.
                </li>
                <li className="list-group-item ">
                  Extending the functionality for components such as date
                  picker, image previewer, tables and implementing base
                  components on the element-ui components for allowing
                  customization to our business needs. Here I have also changed
                  the default webpack, and vuejs configuration to resolve the
                  compilation issues.
                </li>
                <li className="list-group-item ">
                  Fuzzy search and highlighting the found part in the data for a
                  search using fuse.js, exporting the data as pdf and excel
                  using jspdf,xlsx.js on the tables. Here I have extended the
                  element ui table api and provided an interface that takes
                  configuration objects enables these features.
                </li>
                <li className=" list-group-item ">
                  Access control management for different types of users over
                  entire application adhereing to SOLID priciples. Here by using
                  a permission object and a custom implemented mixin I was able
                  to handle the access control at each level from pages to
                  components.
                </li>
                <li className="list-group-item ">
                  Image preview viewer using virtual scroller, vue-grid-layout,
                  along with lazy loading using lozad. Here I made a component
                  that takes the array of objects containing image url and
                  images meta data as input and displays the grid of images.
                </li>
                <li className="list-group-item ">
                  Form builder component where it takes json data object along
                  with configuration of the field as input and create a form
                  along with validations using vee-validate, element-ui form
                  elements.
                </li>
                <li className="list-group-item ">
                  Admin side Applications and handled tables containing 10000
                  rows with virtual row rendering provided by the ag-grid,
                  backend pagination and infinite scroll using intersection
                  observer.
                </li>
                <li className="list-group-item ">
                  Conditionally toggling the features based on the user
                  permissions, possession of devices types.
                </li>
                <li className="list-group-item ">
                  Displaying the fields value according to the user configured
                  preferences.
                </li>
                <li className="list-group-item ">
                  A small tool for web scraping data from pondlogs v1 using
                  puppeteer for device team.
                </li>
              </ol>
            </p>
            <p>
              <strong>
                I have developed following management and behavioural skills:
              </strong>
              <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                  I learned to implement complex tasks by dividing them into
                  small manageable tasks.
                </li>
                <li className="list-group-item">
                  Collaborating with backend team for apis, product manager for
                  requirements gathering.
                </li>
                <li className="list-group-item">
                  Understanding the code and documentation of the open source
                  projects to learn design thoughts and expand my technical
                  knowledge
                </li>
                <li className="list-group-item">
                  Ablity to work independently.
                </li>
                <li className="list-group-item">
                  Asking for help and helping others both technically and career
                  growth.
                </li>
                <li className="list-group-item">
                  Take responsibility for work
                </li>
              </ol>
            </p>
          </div>
        </div>
        <a
          href="../about-me/ast-in-tcs"
          className="list-group-item list-group-item-action"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Tata Consultancy Services</h5>
            <small className="text-muted">Jul-2017 to Dec-2018</small>
          </div>
          <p className="mb-1">Assistant System Engineer</p>
          <small className="text-muted">
            C#, VBScript,Itextsharp, Java, UFT(Unified Functionality Testing)
          </small>
        </a>
        <div
          className={`collapse ${
            string_slug === 'ast-in-tcs' && 'show'
          }  collapse-ast-in-tcs`}
        >
          <div className="card card-body">
            I joined this company in July 2017. During the Initial 3 months I
            was in the ILP phase where I improved my programming skills in Java
            and developed a Banking management application using the Java
            Servlet Page and deployed using Tomcat server. Later I was assigned
            to the Citi Bank project. In that I was assigned to small team to
            start working on automating the BPA tasks using HP UFT, C# and
            VBScript. Here I worked on extracting the data from PDF files using
            Itextsharp, regular expressions and segregated the pdf based on the
            keywords found in the pdf files. I also need to extract values from
            the pdf Files and place them in the excel. I also implemented
            styling, and formatting the excel files using VBScript and UFT. The
            data extracted from the pdf files will be verified with other web
            and desktop applications related to citibank which will be a tedious
            task to do manually. During my free time I did Machine learning in
            Coursera offered by Andrew Ng which is one that helped me to place
            in my latter company.
          </div>
        </div>
      </div>
    </section>
  );
}
