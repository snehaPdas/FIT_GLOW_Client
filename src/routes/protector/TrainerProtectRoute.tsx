import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainerKyc from '../../components/trainers/TrainerKyc';
import KycSubmitStatus from '../../components/trainers/KycSubmitStatus';
import KycRejectionStatus from '../../components/trainers/KycRejectionStatus';
import { getKycStatus } from '../../actions/TrainerAction';
// import { getKycStatus } from '../../redux/actions/trainerActions'; // Assuming this is the correct path to your action

interface TrainerProtectedRouteProps {
  children: React.ReactNode;
}

function TrainerProtectRoute({ children }: TrainerProtectedRouteProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { trainerInfo,kycStatus } = useSelector((state: RootState) => state.trainer);

  const trainer_id = trainerInfo?.id;
  console.log("Trainer ID:", trainer_id);

  useEffect(() => {
    if (trainer_id) {
        console.log("p.......")
      dispatch(getKycStatus(trainer_id));
    } else {
      navigate("/trainer/login");
    }
  }, [trainer_id, dispatch, navigate]);
      console.log("kyc status=======",kycStatus)
      console.log("kyc status=======",trainerInfo)


      if (!trainerInfo) {
        return null;
      } else if (kycStatus === "submitted") {
        return (
          <>
            <KycSubmitStatus />
          </>
        );
      } else if (kycStatus === "rejected") {
        return (
          <>
          <KycRejectionStatus />
          </>
        );
      }  else if (kycStatus === "pending") {
        return (
          <>
            <TrainerKyc />
          </>
        );
      } else {
        return <>{children}</>;
      }
}

export default TrainerProtectRoute;
