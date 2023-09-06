import {
  Check,
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  X,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  close: X,
  check: Check,
  logo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
      />
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  readme: (props: LucideProps) => (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.675 1.53003H10.7917C9.45556 1.53003 8.29445 2.57065 8.00278 4.0394C7.70833 2.57065 6.55 1.53003 5.21389 1.53003H1.33333C0.597222 1.53003 0 2.2019 0 3.03003V10.7113C0 11.5394 0.597222 12.2113 1.33333 12.2113H3.825C6.66389 12.2113 7.51111 12.9738 7.91667 14.555C7.93611 14.6425 8.06111 14.6425 8.08333 14.555C8.49167 12.9738 9.33889 12.2113 12.175 12.2113H14.6667C15.4028 12.2113 16 11.5394 16 10.7113V3.03315C16 2.20815 15.4083 1.53628 14.675 1.53003ZM6.72222 9.82378C6.72222 9.88315 6.68056 9.93315 6.625 9.93315H2.17222C2.11944 9.93315 2.075 9.88628 2.075 9.82378V9.10815C2.075 9.04878 2.11667 8.99878 2.17222 8.99878H6.62778C6.68056 8.99878 6.725 9.04565 6.725 9.10815V9.82378H6.72222ZM6.72222 7.92065C6.72222 7.98003 6.68056 8.03003 6.625 8.03003H2.17222C2.11944 8.03003 2.075 7.98315 2.075 7.92065V7.20503C2.075 7.14565 2.11667 7.09565 2.17222 7.09565H6.62778C6.68056 7.09565 6.725 7.14253 6.725 7.20503V7.92065H6.72222ZM6.72222 6.01753C6.72222 6.0769 6.68056 6.1269 6.625 6.1269H2.17222C2.11944 6.1269 2.075 6.08003 2.075 6.01753V5.3019C2.075 5.24253 2.11667 5.19253 2.17222 5.19253H6.62778C6.68056 5.19253 6.725 5.2394 6.725 5.3019V6.01753H6.72222ZM13.925 9.82065C13.925 9.88003 13.8833 9.93003 13.8278 9.93003H9.375C9.32222 9.93003 9.27778 9.88315 9.27778 9.82065V9.10503C9.27778 9.04565 9.31944 8.99565 9.375 8.99565H13.8306C13.8833 8.99565 13.9278 9.04253 13.9278 9.10503V9.82065H13.925ZM13.925 7.91753C13.925 7.9769 13.8833 8.0269 13.8278 8.0269H9.375C9.32222 8.0269 9.27778 7.98003 9.27778 7.91753V7.2019C9.27778 7.14253 9.31944 7.09253 9.375 7.09253H13.8306C13.8833 7.09253 13.9278 7.1394 13.9278 7.2019V7.91753H13.925ZM13.925 6.0144C13.925 6.07378 13.8833 6.12378 13.8278 6.12378H9.375C9.32222 6.12378 9.27778 6.0769 9.27778 6.0144V5.3019C9.27778 5.24253 9.31944 5.19253 9.375 5.19253H13.8306C13.8833 5.19253 13.9278 5.2394 13.9278 5.3019V6.0144H13.925Z"
        fill="currentColor"
      />
      <path
        d="M-3908 -556H6694V-558H-3908V-556ZM6695 -555V4515H6697V-555H6695ZM6694 4516H-3908V4518H6694V4516ZM-3909 4515V-555H-3911V4515H-3909ZM-3908 4516C-3908.55 4516 -3909 4515.55 -3909 4515H-3911C-3911 4516.66 -3909.66 4518 -3908 4518V4516ZM6695 4515C6695 4515.55 6694.55 4516 6694 4516V4518C6695.66 4518 6697 4516.66 6697 4515H6695ZM6694 -556C6694.55 -556 6695 -555.552 6695 -555H6697C6697 -556.657 6695.66 -558 6694 -558V-556ZM-3908 -558C-3909.66 -558 -3911 -556.657 -3911 -555H-3909C-3909 -555.552 -3908.55 -556 -3908 -556V-558Z"
        fill="currentColor"
        fill-opacity="0.1"
      />
    </svg>
  ),
  hand: (props: LucideProps) => (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.66647 6.33234H3.66914L5.14016 5.56604C5.17187 5.54339 5.1985 5.51111 5.2176 5.4722C5.23669 5.43328 5.24763 5.38898 5.24941 5.34338C5.24771 5.29776 5.23681 5.25341 5.2177 5.21448C5.1986 5.17554 5.17192 5.14329 5.14016 5.12072L3.66855 4.35367H3.66647L3.05312 2.51156C3.03672 2.47045 3.01148 2.43586 2.98022 2.41169C2.94897 2.38752 2.91294 2.37471 2.87619 2.37471C2.83943 2.37471 2.80341 2.38752 2.77215 2.41169C2.7409 2.43586 2.71565 2.47045 2.69925 2.51156L2.08472 4.3533H2.08323L0.609844 5.12109C0.577967 5.14357 0.551171 5.17578 0.531961 5.21472C0.512751 5.25366 0.501755 5.29805 0.5 5.34375V5.34375C0.501775 5.38935 0.512715 5.43365 0.53181 5.47257C0.550905 5.51149 0.577539 5.54376 0.60925 5.56641L2.08145 6.33086H2.08353L2.69687 8.17371C2.7132 8.21494 2.73842 8.24964 2.76968 8.27391C2.80094 8.29817 2.83701 8.31103 2.87381 8.31103C2.91061 8.31103 2.94668 8.29817 2.97794 8.27391C3.00921 8.24964 3.03443 8.21494 3.05075 8.17371L3.66498 6.33234H3.66647ZM14.4941 17.3453L14.4644 17.3297L14.4347 17.3112C14.2443 17.1918 14.0842 17.0087 13.9723 16.7821C13.8604 16.5555 13.8011 16.2945 13.8011 16.0283C13.8011 15.762 13.8604 15.501 13.9723 15.2745C14.0842 15.0479 14.2443 14.8647 14.4347 14.7454L14.4644 14.7272L14.4941 14.7113L15.6071 14.1312L16.0711 12.7404L16.0833 12.7033L16.0972 12.668C16.2115 12.3808 16.4113 12.1622 16.642 12.0246C16.642 11.9752 16.6494 11.9247 16.65 11.8761V5.34375C16.65 5.02881 16.5499 4.72676 16.3718 4.50406C16.1936 4.28136 15.952 4.15625 15.7 4.15625C15.448 4.15625 15.2064 4.28136 15.0282 4.50406C14.8501 4.72676 14.75 5.02881 14.75 5.34375V8.01562C14.75 8.09436 14.725 8.16987 14.6804 8.22555C14.6359 8.28122 14.5755 8.3125 14.5125 8.3125H14.0375C13.9745 8.3125 13.9141 8.28122 13.8696 8.22555C13.825 8.16987 13.8 8.09436 13.8 8.01562V2.375C13.8 2.06006 13.6999 1.75801 13.5218 1.53531C13.3436 1.31261 13.102 1.1875 12.85 1.1875C12.598 1.1875 12.3564 1.31261 12.1782 1.53531C12.0001 1.75801 11.9 2.06006 11.9 2.375V8.01562C11.9 8.09436 11.875 8.16987 11.8304 8.22555C11.7859 8.28122 11.7255 8.3125 11.6625 8.3125H11.1875C11.1245 8.3125 11.0641 8.28122 11.0196 8.22555C10.975 8.16987 10.95 8.09436 10.95 8.01562V1.1875C10.95 0.872555 10.8499 0.57051 10.6718 0.347811C10.4936 0.125111 10.252 0 10 0C9.74804 0 9.50641 0.125111 9.32825 0.347811C9.15009 0.57051 9.05 0.872555 9.05 1.1875V8.01562C9.05 8.09436 9.02498 8.16987 8.98044 8.22555C8.9359 8.28122 8.87549 8.3125 8.8125 8.3125H8.3375C8.27451 8.3125 8.2141 8.28122 8.16956 8.22555C8.12502 8.16987 8.1 8.09436 8.1 8.01562V2.375C8.1 2.06006 7.99991 1.75801 7.82175 1.53531C7.64359 1.31261 7.40196 1.1875 7.15 1.1875C6.89804 1.1875 6.65641 1.31261 6.47825 1.53531C6.30009 1.75801 6.2 2.06006 6.2 2.375V11.3184L5.49967 10.1127C5.31429 9.79424 5.0353 9.5809 4.72407 9.51958C4.41285 9.45827 4.09489 9.55401 3.84014 9.78574C3.58539 10.0175 3.41472 10.3662 3.36567 10.7552C3.31662 11.1443 3.39321 11.5417 3.57859 11.8602L7.30734 18.2656C7.4395 18.4927 7.61268 18.6775 7.81279 18.8052C8.0129 18.9328 8.23428 18.9995 8.45892 19H14.3255C14.8967 19 15.3838 18.5647 15.6092 17.9316L15.6071 17.9253L14.4941 17.3453ZM10.8844 12.5994L10 13.0599L9.63128 14.165C9.6214 14.1896 9.60625 14.2103 9.5875 14.2248C9.56876 14.2392 9.54717 14.2469 9.52515 14.2469C9.50313 14.2469 9.48154 14.2392 9.46279 14.2248C9.44405 14.2103 9.42889 14.1896 9.41901 14.165L9.05 13.0599L8.16561 12.5994C8.14585 12.5871 8.12922 12.5681 8.11761 12.5446C8.10599 12.5212 8.09983 12.4941 8.09983 12.4665C8.09983 12.4389 8.10599 12.4119 8.11761 12.3884C8.12922 12.3649 8.14585 12.346 8.16561 12.3337L9.05 11.8728L9.41872 10.7677C9.4286 10.7431 9.44376 10.7224 9.4625 10.7079C9.48124 10.6935 9.50283 10.6858 9.52485 10.6858C9.54687 10.6858 9.56846 10.6935 9.5872 10.7079C9.60595 10.7224 9.62111 10.7431 9.63098 10.7677L10 11.8728L10.8844 12.3337C10.9042 12.346 10.9208 12.3649 10.9324 12.3884C10.944 12.4119 10.9502 12.4389 10.9502 12.4665C10.9502 12.4941 10.944 12.5212 10.9324 12.5446C10.9208 12.5681 10.9042 12.5871 10.8844 12.5994ZM19.5 16.0279C19.4983 15.9823 19.4874 15.9379 19.4683 15.899C19.4492 15.86 19.4225 15.8278 19.3908 15.8053L17.9191 15.0382H17.9171L17.3031 13.1972C17.2867 13.1561 17.2615 13.1215 17.2302 13.0973C17.199 13.0732 17.1629 13.0604 17.1262 13.0604C17.0894 13.0604 17.0534 13.0732 17.0222 13.0973C16.9909 13.1215 16.9657 13.1561 16.9493 13.1972L16.3347 15.0389H16.3332L14.8598 15.8086C14.8281 15.8311 14.8014 15.8634 14.7823 15.9023C14.7632 15.9413 14.7523 15.9856 14.7506 16.0312C14.7525 16.0766 14.7636 16.1205 14.7826 16.1591C14.8017 16.1977 14.8283 16.2297 14.8598 16.2521L16.3315 17.0191H16.3335L16.9469 18.8594C16.9632 18.9006 16.9884 18.9353 17.0197 18.9595C17.0509 18.9838 17.087 18.9967 17.1238 18.9967C17.1606 18.9967 17.1967 18.9838 17.2279 18.9595C17.2592 18.9353 17.2844 18.9006 17.3007 18.8594L17.915 17.018H17.9177L19.3887 16.2513C19.4202 16.2289 19.4468 16.1969 19.4659 16.1584C19.485 16.1198 19.496 16.0758 19.4979 16.0305L19.5 16.0279Z"
        fill="currentColor"
      />
    </svg>
  ),
  hammer: (props: LucideProps) => (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.3452 7.19699L18.5987 6.35721C18.3925 6.12527 18.0584 6.12527 17.8522 6.35721L17.4792 6.77691L16.5259 5.70445C16.7116 4.91365 16.5377 4.03824 15.9865 3.41814L14.4939 1.73895C12.4329 -0.579648 9.09112 -0.579648 7.02982 1.73895L10.0154 3.41814V4.11395C10.0154 4.74369 10.2377 5.34783 10.6339 5.79314L12.2548 7.6167C12.806 8.2368 13.5842 8.43236 14.2871 8.22344L15.2404 9.2959L14.8673 9.7156C14.6612 9.94754 14.6612 10.3235 14.8673 10.5554L15.6138 11.3952C15.82 11.6271 16.1541 11.6271 16.3603 11.3952L19.3458 8.03641C19.5514 7.80484 19.5513 7.42893 19.3452 7.19699ZM9.88741 6.63293C9.76536 6.49562 9.66178 6.34385 9.56249 6.18947L1.14774 15.0278C0.304283 15.914 0.281523 17.4099 1.09727 18.3279C1.91302 19.246 3.24302 19.2204 4.03072 18.2712L11.8857 8.80568C11.7551 8.69769 11.6251 8.58785 11.5083 8.45648L9.88741 6.63293Z"
        fill="currentColor"
      />
    </svg>
  ),
  checkActive: (props: LucideProps) => (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.25 1.86456V12.3739C12.2488 12.5271 12.1873 12.6736 12.079 12.7819C11.9706 12.8902 11.8239 12.9515 11.6707 12.9526H2.32925C2.17572 12.9526 2.02848 12.8916 1.91986 12.7831C1.81125 12.6746 1.75015 12.5274 1.75 12.3739V1.86456C1.75122 1.71136 1.81266 1.5648 1.92104 1.45652C2.02943 1.34825 2.17605 1.28696 2.32925 1.28589H11.6707C11.9904 1.28589 12.25 1.54489 12.25 1.86456ZM6.58758 7.77372L5.14383 6.32939L4.319 7.15481L6.58758 9.42339L9.8875 6.12347L9.06267 5.29864L6.58758 7.77314V7.77372Z"
        fill="currentColor"
      />
    </svg>
  ),
  archived: (props: LucideProps) => (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.74984 6.33333H12.2498V12.169C12.2498 12.4898 11.9903 12.75 11.6706 12.75H2.32909C2.25289 12.7499 2.17746 12.7348 2.1071 12.7056C2.03675 12.6763 1.97284 12.6335 1.91905 12.5796C1.86525 12.5256 1.82262 12.4616 1.79358 12.3911C1.76455 12.3207 1.74968 12.2452 1.74984 12.169V6.33333ZM5.24984 7.5V8.66667H8.74984V7.5H5.24984ZM1.1665 2.83333C1.1665 2.51133 1.43192 2.25 1.74517 2.25H12.2545C12.5742 2.25 12.8332 2.509 12.8332 2.83333V5.16667H1.1665V2.83333Z"
        fill="#242528"
      />
    </svg>
  ),
  arrowLeft: (props: LucideProps) => (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.52268 9.78578L10.9927 5.31578L9.81435 4.13745L3.33268 10.6191L9.81435 17.1008L10.9927 15.9225L6.52268 11.4525H16.666V9.78578H6.52268Z"
        fill="currentColor"
      />
    </svg>
  ),
  arrowDown: (props: LucideProps) => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.4997 13.6719L17.4497 8.72192L18.8637 10.1359L12.4997 16.4999L6.13574 10.1359L7.54974 8.72192L12.4997 13.6719Z"
        fill="currentColor"
      />
    </svg>
  ),
}
