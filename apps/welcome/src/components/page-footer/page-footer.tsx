import { AppLinks } from '../../app/static-links';
import styles from './page-footer.module.scss';

/* eslint-disable-next-line */
export interface PageFooterProps {}

export function PageFooter(props: PageFooterProps) {
  return (
    <div className="text-center py-5 mb-5 box  my-10">
    <a href="#" className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
        <img src="assets/logo/openhmis.png" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
         OpenHMIS  
    </a>
    {/* <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© 2021-2023. All Rights Reserved. Built with <a href="https://flowbite.com" className="text-purple-600 hover:underline dark:text-purple-500">Flowbite</a> and <a href="https://tailwindcss.com" className="text-purple-600 hover:underline dark:text-purple-500">Tailwind CSS</a>.
    </span> */}
    <ul className="flex justify-center mt-5 space-x-5">
       
        <li>
            <a href={AppLinks.github} className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
            </a>
        </li>
     
    </ul>
</div>
  );
}

export default PageFooter;
