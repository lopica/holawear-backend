package vn.edu.fpt.holawear.adapters;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import vn.edu.fpt.holawear.R;
import vn.edu.fpt.holawear.models.Type;

public class TypeAdapter extends RecyclerView.Adapter<TypeAdapter.ViewHolder> {

    private ArrayList<Type> typeList;
    private Context myContext;

    public TypeAdapter(ArrayList<Type> typeList, Context myContext) {
        this.typeList = typeList;
        this.myContext = myContext;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView textViewName;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewName = itemView.findViewById(R.id.textViewName);  // Assume you have a TextView in your layout
        }
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = ((Activity) myContext).getLayoutInflater();
        View view = inflater.inflate(R.layout.viewholder_type_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        // Get data from the position
        Type type = typeList.get(position);

        // Set data to the TextView
        holder.textViewName.setText(type.getName());
    }

    @Override
    public int getItemCount() {
        return typeList.size();
    }
}
