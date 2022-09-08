import styles from './projectimages.module.scss';

/* eslint-disable-next-line */
export interface ProjectimagesProps {}

export function Projectimages(props: ProjectimagesProps) {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
        <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-3 dark:text-gray-400">
            <a href="#" className="flex items-center lg:justify-center">
              <img src="https://abdm.gov.in:8081/uploads/digital_mission_a6ed582996.svg" alt="" />                                          
            </a>
            <a href="#" className="flex items-center lg:justify-center">
                <img src="https://abdm.gov.in:8081/uploads/ndhm_logo_65d00d9518.png" alt=""  />
            </a>
            

            <a href="#" className="flex items-center lg:justify-center">
              <img src="https://abdm.gov.in:8081/uploads/Digital_India_logo_svg_7fcd9ae825.png" alt="" />                                                                                 
            </a>
            
        </div>
    </div>
</section>
  );
}

export default Projectimages;
